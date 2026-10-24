   import HomeActions from "../components/Home/HomeActions";
   import HomeStats from "../components/Home/HomeStats";
   import HomeHeader from "../components/Home/HomeHeader";
   import HomeHero from "../components/Home/HomeHero";
   import HomeFeatures from "../components/Home/HomeFeatures";
   import HomeSteps from "../components/Home/HomeSteps";
   import HomeFooter from "../components/Home/HomeFooter";
   export default function HomePage() {
   return (
      <div className="landing">
         <HomeHeader />
         <main>
         <HomeHero />

         <HomeFeatures />

         <HomeStats />

         <HomeSteps />

         <HomeActions />
         </main>

         <HomeFooter />
      </div>
   );
   }
