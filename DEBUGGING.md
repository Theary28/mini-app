# Debugging journal: product catalog

Three bugs were planted in the catalog in commit `b4c4600` ("Plant three bugs
for the debugging hunt"). All three pass `tsc --noEmit` and `eslint`, so the
editor can't find them. Each was fixed with a runtime tool, in its own commit.

To reproduce any entry: `git checkout b4c4600 && npm run dev`, then open
Chrome DevTools.

The bugs mask each other (the crash hides everything, and the bad URL hides the
prices), so they were fixed in this order.

---

## Bug 1: crash (`.map()` on null state)

**Symptom.** The whole page is blank. The profile header disappears too,
because an error during render unmounts the entire React tree. The console
shows `TypeError: Cannot read properties of null (reading 'map')` pointing at
`ProductCatalog`.

**Tool.** Sources panel breakpoint. I ticked *Pause on uncaught exceptions*
and reloaded, and also set a line breakpoint on
`const publicProducts = products!.map(toPublicProduct)` in
`ProductCatalog.tsx`.

**What it showed.**
- Scope → Local: `products: null`, `status: "loading"`.
- The Call Stack is React's first render of the component (`renderWithHooks`
  under the initial `createRoot().render`). There's no `.then` callback from
  `fetchProducts` in the stack, so this isn't a re-render after the fetch.
- So the component renders once *before* `useEffect` runs the fetch. On that
  first render `products` is still its initial value, `null`.
- The `!` in `products!.map` told TypeScript "trust me, this isn't null".
  That's why `tsc` stayed quiet.

**Fix.** Initialise the state as an empty list and remove every non-null assertion:

```ts
const [products, setProducts] = useState<Product[]>([])
const publicProducts = products.map(toPublicProduct)
```

"Not loaded yet" is already tracked by `status`, so `null` wasn't adding any
information. Lesson: a `!` switches off the check that would have caught this.

## Bug 2: network failure (mistyped URL)

**Symptom.** Once the crash was fixed, the catalog showed *"Could not load
products: Unexpected token '<', "<!doctype "... is not valid JSON"*. The console
showed the same `SyntaxError` with no URL in it. The message sounded like our
JSON file was broken, but `public/api/products.json` parsed fine.

**Tool.** Network tab, filtered to *Fetch/XHR*, then reload.

**What it showed.**
- One request: `prodcuts.json`. The Headers tab shows the full URL
  `/api/prodcuts.json`, a typo for `products`.
- Status **200**, `Content-Type: text/html`. The Response tab shows our own
  `index.html`. The Vite dev server falls back to `index.html` for any path it
  can't find, so there was no 404 to warn us, and `res.ok` was `true`.
- The `'<'` in the error is the first character of `<!doctype html>`.

**Fix.** Correct `PRODUCTS_URL` to `/api/products.json`. I also added a
content-type check in `fetchProducts`. Next time a bad URL gets the HTML
fallback, the error message will name the URL and the content type
(`GET /api/… returned text/html, not JSON`) instead of the confusing parse error.

## Bug 3: silent wrong value (prop name typo)

**Symptom.** With the data loading again, the three sale items (Mechanical
Keyboard, USB-C Hub, Headphones) show the red **SALE** tag but at full price:
$89.99 instead of $71.99, with no struck-through original price. There's
nothing in the console. No error, no warning.

**Tool.** React DevTools → Components tab. I selected a `ProductItem` for a
sale item and looked at its props.

**What it showed.**
- The props panel listed `currency: "USD"` and **`discountPrecent: 20`**,
  and there was no `discountPercent`.
- `ProductItem` reads `discountPercent`, so it got `undefined`, and
  `discountPercent ?? 0` quietly turned that into "0% off".
- The parent *was* sending 20, just under the wrong name. Only the props panel
  shows the name a component actually received.
- Why TypeScript missed it: the value arrives through a spread,
  `<ProductItem {...cardDisplay} />`, and `cardDisplay` had no type annotation.
  TypeScript only rejects a spread if it shares *no* keys with the props type.
  This one shared `currency`, so the extra misspelled key got through.

**Fix.** Rename the key to `discountPercent` and put the type check back:

```ts
const cardDisplay = {
  currency: 'USD',
  discountPercent: 20,
} satisfies ProductCardDisplay
```

With `satisfies` in place, the original typo is a compile error:
`'discountPrecent' does not exist in type 'ProductCardDisplay'. Did you mean
to write 'discountPercent'?` (checked with `tsc`).

---

## Which tool caught which bug

A Sources breakpoint caught the null `.map()` crash, the Network tab caught the
mistyped URL, and React DevTools caught the misspelled prop. The console alone
wasn't enough because it only reports the moment something throws: it couldn't
show that `products` was `null` on the first render, or that the `SyntaxError`
came from a 200-OK HTML page at the wrong URL, and it logs nothing at all for a
prop that is silently `undefined`.

## Audit checklist

- [x] `npm run typecheck` (`tsc --noEmit`): clean after every fix commit, and on the sabotaged commit too
- [x] No `any` anywhere in `src` (`@typescript-eslint/no-explicit-any` is `error`; `res.json()` is read as `unknown`)
- [x] Every entry names the DevTools tool that found the bug: Sources breakpoint, Network tab, React DevTools
