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

