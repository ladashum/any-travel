import { createFileRoute } from "@tanstack/react-router";
import { Approach } from "@/components/site/approach";
import { Contacts } from "@/components/site/contacts";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Places } from "@/components/site/places";
import { SearchModule } from "@/components/site/search-module";
import { LeadRoot } from "@/components/site/lead-dialog";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <LeadRoot>
    <div id="top">
      <SiteHeader />
      <main>
        <Hero />
        <section id="search" className="mx-auto max-w-6xl scroll-mt-20 px-0 pt-4 pb-4 sm:px-6 sm:pt-8">
          <SearchModule />
        </section>
        <Approach />
        <Places />
        <Contacts />
      </main>
      <SiteFooter />
    </div>
    </LeadRoot>
  );
}
