import { HeaderSection, HeroSection, WeatherDetailsSection } from './sections/index'

const App = () => {
  return (
    <main className='flex flex-col gap-7 bg-neutral-900 h-full px-5 py-5 lg:px-16'>
      <section>
        <HeaderSection />
      </section>
      
      <section>
        <HeroSection />
      </section>

      <section>
        <WeatherDetailsSection />
      </section>
      
    </main>
  )
}

export default App