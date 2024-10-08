"use client"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Zap, Sliders, ArrowRight } from "lucide-react"
import CategoryCard from "@/components/common/category-card"
import FeaturedAgentCard from "@/components/common/featured-agent-card"
import Testimonials from "@/components/common/testimonials"
import { useQuery } from "@tanstack/react-query"

const features = [
  {
    icon: Check,
    title: "Cutting-edge AI",
    description: "Access to the latest AI technologies and models",
  },
  {
    icon: Sliders,
    title: "Customizable Agents",
    description: "Tailor AI agents to your specific needs",
  },
  {
    icon: Zap,
    title: "Seamless Integration",
    description: "Easy integration with your existing workflows",
  },
]

const fetchFeaturedCategories = async () => {
  const response = await fetch("http://localhost:8001/categories?featured=true")
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

const fetchFeaturedAgents = async () => {
  const response = await fetch("http://localhost:8001/agents?featured=true")
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

export default function HomePage() {
  const { data: categories } = useQuery({
    queryKey: ["featuredCategories"],
    queryFn: fetchFeaturedCategories,
  })

  const { data: featuredAgents } = useQuery({
    queryKey: ["featuredAgents"],
    queryFn: fetchFeaturedAgents,
  })

  return (
    <div className="flex flex-col min-h-screen  text-white">
      <main className="flex-grow">
        {/* HERO SECTION*/}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero.png"
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4 tracking-tighter">
              Welcome to AgentMarketplace.ai
            </h1>
            <p className="text-xl mb-8 text-gray-400">
              Discover and subscribe to AI agents that boost your productivity
            </p>
            <Button className="rounded-xl font-semibold" size="lg">
              Get Started <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </section>

        <section className="bg-gray-800">
          {/* SEARCH */}
          <div className="flex items-center py-8 max-w-4xl mx-auto">
            <Input
              placeholder="Search for AI agents..."
              className="flex-grow mr-2 text-white border-gray-700  bg-gray-800"
            />
            <Button>Search</Button>
          </div>

          {/* EXPLORE CATEGORIES */}
          <div className="bg-gray-900">
            <div className="max-w-7xl mx-auto py-8">
              <h2 className="text-3xl font-bold mb-8">Explore Categories</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {categories?.slice(0, 3).map((category: any) => (
                  <CategoryCard
                    key={category.name}
                    name={category.name}
                    image={category.imageUrl}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* FEATURED AGENTS */}
          <div className="py-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Featured Agents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredAgents?.agents?.slice(0, 3).map((agent: any) => (
                  <FeaturedAgentCard
                    key={agent.name}
                    name={agent.title}
                    description={agent.description}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div className="bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">
                Why Choose AgentMarketplace.ai
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mb-4">
                {features.map((feature) => (
                  <Card key={feature.title} className="bg-gray-700 border-0">
                    <CardHeader>
                      <feature.icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-white text-[20px]">
                        <p>{feature.title} </p>
                        <p className="text-gray-300 text-sm mt-2 font-normal">
                          {feature.description}
                        </p>
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* TESTIMONIALS */}
          <div className="max-w-7xl mx-auto">
            <Testimonials />
          </div>

          {/* CTA */}
          <div className="bg-gray-900 py-8">
            <Card className="bg-primary text-center border-0 text-white max-w-7xl mx-auto">
              <CardContent className="py-12">
                <h2 className="text-3xl text-white font-bold mb-4">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl mb-8">
                  Join thousands of satisfied users and experience the power of
                  AI
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                >
                  Get Started Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
