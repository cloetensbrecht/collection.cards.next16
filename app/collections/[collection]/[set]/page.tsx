import { PokemonSet } from "@/alinea/schemas/PokemonSet";
import { cms } from "@/cms";
import Container from "@/components/container/Container";
import { Title } from "@/components/title/Title";

const fetchSet = async (set: string) => {
  return await cms.first({
    type: PokemonSet,
    path: set,
  });
};

export default async function Set({
  params,
}: {
  params: Promise<{ collection: string; set: string }>;
}) {
  const { set } = await params;
  const setData = await fetchSet(set);

  return (
    <Container>
      <Title.H1>{setData?.title}</Title.H1>
      <section className="-mt-16 min-h-[calc(100dvh-4rem)] flex-1 pt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div
            className="flex h-192 flex-col justify-center gap-12 overflow-hidden rounded-xl bg-[url(https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/hero/image-17.png?width=1216&amp;format=auto)] bg-cover bg-center p-12 sm:gap-16 sm:p-16 lg:gap-24 lg:p-24"
            // style="opacity: 1; transform: none;"
          >
            <div className="space-y-1.5">
              <p
                className="text-2xl font-medium text-white sm:text-3xl"
                // style="opacity: 1; transform: none;"
              >
                Your Portal to Worldwide Adventures
              </p>
              <h1
                className="bg-gradient-to-b from-white/50 to-white/90 bg-clip-text text-3xl leading-[1.29167] font-bold break-all text-transparent uppercase sm:text-7xl lg:text-9xl"
                // style="opacity: 1; transform: none;"
              >
                GlobeTrekker
              </h1>
            </div>
            <div>
              {/* style="opacity: 1; transform: none;" */}
              <div
                dir="ltr"
                data-orientation="horizontal"
                data-slot="tabs"
                className="flex flex-col gap-0"
              >
                <div
                  role="tablist"
                  aria-orientation="horizontal"
                  data-slot="tabs-list"
                  className="bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] rounded-b-none"
                  tabIndex={0}
                  data-orientation="horizontal"
                  //   style="outline:none"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected="true"
                    aria-controls="radix-_R_1fbinpfiv5ubsnpnb_-content-destination"
                    data-state="active"
                    id="radix-_R_1fbinpfiv5ubsnpnb_-trigger-destination"
                    data-slot="tabs-trigger"
                    className="data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4"
                    tabIndex={0}
                    data-orientation="horizontal"
                    data-radix-collection-item=""
                  >
                    Destination
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected="false"
                    aria-controls="radix-_R_1fbinpfiv5ubsnpnb_-content-flights"
                    data-state="inactive"
                    id="radix-_R_1fbinpfiv5ubsnpnb_-trigger-flights"
                    data-slot="tabs-trigger"
                    className="data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4"
                    tabIndex={-1}
                    data-orientation="horizontal"
                    data-radix-collection-item=""
                  >
                    Flights
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected="false"
                    aria-controls="radix-_R_1fbinpfiv5ubsnpnb_-content-hotels"
                    data-state="inactive"
                    id="radix-_R_1fbinpfiv5ubsnpnb_-trigger-hotels"
                    data-slot="tabs-trigger"
                    className="data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4"
                    tabIndex={-1}
                    data-orientation="horizontal"
                    data-radix-collection-item=""
                  >
                    Hotels
                  </button>
                </div>
                <div
                  data-state="active"
                  data-orientation="horizontal"
                  role="tabpanel"
                  aria-labelledby="radix-_R_1fbinpfiv5ubsnpnb_-trigger-destination"
                  id="radix-_R_1fbinpfiv5ubsnpnb_-content-destination"
                  tabIndex={0}
                  data-slot="tabs-content"
                  className="flex-1 outline-none bg-card rounded-lg rounded-tl-none p-6"
                >
                  <form className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="w-full space-y-2">
                      <label
                        data-slot="label"
                        className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                        htmlFor="location"
                      >
                        Location
                      </label>
                      <div className="relative">
                        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-map-pin size-4"
                            aria-hidden="true"
                          >
                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <span className="sr-only">Location</span>
                        </div>
                        <input
                          data-slot="input"
                          className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive peer h-10 rounded-full pl-9"
                          id="location"
                          placeholder="Location"
                          required={true}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="w-full space-y-2">
                      <label
                        data-slot="label"
                        className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 px-1"
                        htmlFor="destination-date"
                      >
                        Date
                      </label>
                      <div className="relative flex gap-2">
                        <input
                          data-slot="input"
                          className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 rounded-full pr-10"
                          id="destination-date"
                          placeholder="Month Day, Year"
                          required={true}
                          value=""
                        />
                        <button
                          data-slot="popover-trigger"
                          className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 px-4 py-2 has-[&gt;svg]:px-3 absolute top-1/2 right-2 size-6 -translate-y-1/2"
                          id="date-picker"
                          type="button"
                          aria-haspopup="dialog"
                          aria-expanded="false"
                          aria-controls="radix-_r_2i_"
                          data-state="closed"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-calendar size-3.5"
                            aria-hidden="true"
                          >
                            <path d="M8 2v4"></path>
                            <path d="M16 2v4"></path>
                            <rect
                              width="18"
                              height="18"
                              x="3"
                              y="4"
                              rx="2"
                            ></rect>
                            <path d="M3 10h18"></path>
                          </svg>
                          <span className="sr-only">Pick a date</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        data-slot="label"
                        className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                        htmlFor="person"
                      >
                        Person
                      </label>
                      <button
                        type="button"
                        role="combobox"
                        aria-controls="radix-_r_2j_"
                        aria-expanded="false"
                        aria-required="true"
                        aria-autocomplete="none"
                        dir="ltr"
                        data-state="closed"
                        data-placeholder=""
                        data-slot="select-trigger"
                        data-size="default"
                        className="border-input data-[placeholder]:text-muted-foreground [&amp;_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex items-center justify-between gap-2 border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 relative !h-10 w-full rounded-full pl-9"
                        id="person"
                      >
                        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 group-has-[select[disabled]]:opacity-50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-users size-4"
                            aria-hidden="true"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                          </svg>
                          <span className="sr-only">Person</span>
                        </div>
                        <span
                          data-slot="select-value"
                          //   style="pointer-events: none;"
                        >
                          Person
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-chevron-down size-4 opacity-50"
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </button>
                      <select
                        aria-hidden="true"
                        required={true}
                        tabIndex={-1}
                        // style="position: absolute; border: 0px; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; overflow-wrap: normal;"
                      >
                        <option value=""></option>
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4">4 Persons</option>
                      </select>
                    </div>
                    <button
                      data-slot="button"
                      className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs h-10 px-6 has-[&gt;svg]:px-4 cursor-pointer justify-start self-end rounded-full"
                      type="submit"
                    >
                      Search Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Blocks blocks={blocksWithOverview} /> */}
    </Container>
  );
}
