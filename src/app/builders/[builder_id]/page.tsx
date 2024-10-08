"use client"
import Image from "next/image"
import Link from "next/link"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { Github, Linkedin, Star, Twitter } from "lucide-react"
import AgentCard from "@/components/common/agent-card"
import { useQuery } from "@tanstack/react-query"

const builderData = {
  name: "John Doe",
  title: "AI Agent developer & innovator",
  stats: "15 agents created | 10k+ Users",
  bio: "John Doe is a leading AI agent developer known for creating innovative and efficient agents that revolutionize various industries. With a passion for AI and automation, John's agents have helped thousands of users streamline their workflows and boost productivity.",
  avatar: "/placeholder.svg?height=100&width=100",
  socialLinks: [
    { icon: Github, url: "https://github.com" },
    { icon: Linkedin, url: "https://linkedin.com" },
    { icon: Twitter, url: "https://twitter.com" },
  ],
}

const fetchBuilderDetails = async () => {
  const response = await fetch(
    "http://localhost:8001/users/creator/14824b34-a311-4de9-9897-0be5f3cf4c9d"
  )
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

export default function BuilderPage() {
  const { data: builderDetail } = useQuery({
    queryKey: ["buiLderDetail"],
    queryFn: fetchBuilderDetails,
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Image
              src={builderDetail?.creator?.imageUrl}
              alt={"buidlder image"}
              width={140}
              height={140}
              className="rounded-full border-4 border-purple-600"
            />
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">
                {builderDetail?.creator.name}
              </h1>
              <p className="text-gray-400 mb-2">{builderData.title}</p>
              <p className="text-gray-400 mb-4">{builderData.stats}</p>
              <p className="text-gray-300 mb-4">{builderData.bio}</p>
              <div className="flex justify-center md:justify-start space-x-4">
                {builderData.socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    className="text-purple-400 hover:text-white"
                  >
                    <link.icon className="h-6 w-6" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            Agents by {builderData.name}
          </h2>
          <p className="text-gray-400">Showing 1-6 of 15 agents</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {builderDetail?.agents.map((agent: any) => (
            <AgentCard {...agent} key={agent.id} />
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem className="rounded-tl-md rounded-bl-md">
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem className="border-r border-gray-700">
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="border-r border-gray-700">
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem className="border-r border-gray-700">
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem className="rounded-tr-md rounded-br-md">
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  )
}
