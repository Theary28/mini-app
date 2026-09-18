import StatusBadge from './components/StatusBadge'
import Section from './components/Section'
import ProjectCard from './components/ProjectCard'
import ProductCatalog from './components/catalog/ProductCatalog'

function App() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 rounded-lg bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-500">
                Developer Profile
              </p>

              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Eav Chansotheary
              </h1>

              <p className="mt-4 max-w-2xl text-gray-700">
                Software Engineering student focused on building modern,
                secure, and user-friendly web applications.
              </p>
            </div>

            <StatusBadge isAvailable={true} />
          </div>
        </header>



     

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <Section title="About Me">
              <p className="text-gray-700">
                I am learning React, modern frontend development, and
                full-stack web development through hands-on projects.
              </p>
            </Section>

            <Section title="Projects">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <ProjectCard
                  title="CambodiaTrade Chatbot"
                  description="A bilingual AI-powered RAG chatbot for product recommendations and FAQs."
                  status="In Progress"
                  link="#"
                />

                <ProjectCard
                  title="Secure Exam Dashboard"
                  description="A web dashboard designed to manage secure entrance examination workflows."
                  status="Completed"
                  link="#"
                />
              </div>
            </Section>
          </div>

          <aside className="space-y-6">
            <Section title="Skills">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-700">
                  React
                </span>

                <span className="rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-700">
                  Vue
                </span>

                <span className="rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-700">
                  Laravel
                </span>

                <span className="rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-700">
                  Node.js
                </span>
              </div>
            </Section>

            <Section title="Goal">
              <p className="text-gray-500">
                Keep learning, build real projects, and become a stronger
                full-stack developer.
              </p>
            </Section>
          </aside>
        </div>

        <div className="mt-6">
          <Section title="Mini-app: Product Catalog">
            <ProductCatalog />
          </Section>
        </div>
      </div>
    </main>
  )
}

export default App