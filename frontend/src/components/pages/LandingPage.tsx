import LandingPageHeader from "../LandingPageHeader"
import { Link } from 'react-router-dom'
import { Button } from "../ui/button"
import FeatureCard from "../FeatureCard"
import { useTheme } from "@/components/theme-provider"

import barchartIconDarkMode from "../../assets/barchartIconDarkMode.svg"
import calcIconDarkMode from "../../assets/calcIconDarkMode.svg"
import estimateIconDarkMode from "../../assets/estimateIconDarkMode.svg"
import projectsIconDarkMode from "../../assets/projectsIconDarkmode.svg"
import barchartIconLightMode from "../../assets/barchartIconLightMode.svg"
import calcIconLightMode from "../../assets/calcIconLightMode.svg"
import estimateIconLightMode from "../../assets/estimateIconLightMode.svg"
import projectsIconLightMode from "../../assets/projectsIconLightmode.svg"


//Personally I like the conditional rendering of the path in string. 

export default function LandingPage() {
    const { theme } = useTheme()
    // console.log(theme)
    //psuedo code this shit. I think cleanest would be to make a function that returns the path. The function would accept the name of the feature as lowercase string 


    const calcIcon = theme === 'dark' ? calcIconDarkMode : calcIconLightMode
    const projectsIcon = theme === 'dark' ? projectsIconDarkMode : projectsIconLightMode
    const barchartIcon = theme === 'dark' ? barchartIconDarkMode : barchartIconLightMode
    const estimateIcon = theme === 'dark' ? estimateIconDarkMode : estimateIconLightMode

    return (
        <>
            <LandingPageHeader />
            <main>
                <section className="flex flex-col items-center space-x-4">
                    <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl mt-24 mb-12" >Build Buddy</h1>
                    <p className="max-w-[500px] text-muted-foreground text-xl mb-4" >Being a small scale artist, craftsman, or manufacturer is full of challenges, and building a well functioning and good looking product is only one of them.
                    </p>
                    <p className="max-w-[500px] text-muted-foreground text-xl mb-4">Build Buddy helps you take care of the annoying parts of running a small business so that you can spend more time doing what you do best- building.</p>
                    <Button asChild variant="secondary" size="lg">
                        <Link to="/register" className="mt-4 mb-16">Try it out</Link>
                    </Button>
                    <h2 className="text-3xl mb-3">More time building. Less time administering.</h2>
                    <p className="mb-8">Build Buddy saves you time by by making the the chores of running a small business easy:</p>
                    <section className="max-w-2xl mx-auto flex justify-between space-x-6">
                        <FeatureCard
                            image={calcIcon}
                            altText="An icon of geometric shapes and calculations"
                            description="Industry tailored calculations and conversions."
                        />
                        <FeatureCard
                            image={projectsIcon}
                            altText="An icon of paper folders representing projects"
                            description="Manage Projects through reusable task-lists."
                        />
                        <FeatureCard
                            image={barchartIcon}
                            altText="An icon of a bar chart with progressively higher bars from right to left, and an upward arrow along the top for emphasis"
                            description="Automatically track costs."
                        />
                        <FeatureCard
                            image={estimateIcon}
                            altText="An icon of a bill or receipt with a dollar sign and checkbox line items beneath"
                            description="Generate cost-adjusted estimates."
                        />

                    </section>
                </section>
            </main>
        </>
    )
}



