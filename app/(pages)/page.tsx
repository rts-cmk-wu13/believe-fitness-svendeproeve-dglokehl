import Link from "next/link"
import { fetchRevalidate } from "../api/fetches"
import type { NewsArticle } from "../api/types"
import PageWrapper from "@/components/layout/PageWrapper"
import Hero from "@/components/blocks/Hero"
import NewsArticleCard from "@/components/cards/NewsArticleCard"
import NewsletterForm from "@/components/forms/NewsletterForm"
import TestimonialGallery from "@/components/blocks/TestimonialGallery"
import ContactForm from "@/components/forms/ContactForm"

export default async function HomePage() {
    const news = await fetchRevalidate("http://localhost:4000/api/v1/news")
    // console.log("news:", news)
    const testimonials = await fetchRevalidate("http://localhost:4000/api/v1/testimonials")
    // console.log("testimonials:", testimonials)

    return (
        <PageWrapper main={{ className: "mt-0! pt-0! pb-10 space-y-12" }}>
            <div className="px-0! *:not-first:px-default">
                <Hero />

                <section className="mt-default space-y-4">
                    <h2 className="text-6xl font-bold text-app-yellow">News</h2>
                    <div className="space-y-12">
                        {news.map((item: NewsArticle, i: number) => <NewsArticleCard article={item} key={i} />)}
                    </div>
                </section>
            </div>

            <hr className="mx-auto h-0.5 w-10 bg-app-black border-0" />

            <NewsletterForm />

            <TestimonialGallery testimonials={testimonials} />

            <ContactForm />

            <hr className="mx-auto h-0.5 w-10 bg-app-black border-0" />

            <section className="space-y-1 text-center">
                <h3 className="text-3xl font-bold text-app-yellow">Believe Fitness</h3>
                <p className="text-lg font-bold">Train like a pro</p>
                <address className="mt-3 not-italic">
                    <p>Rabalderstræde 48 ‧ 4000 Roskilde</p>
                    <Link href="mailto:hello@believe-fitness.com" className="hover:underline">hello@believe-fitness.com</Link>
                </address>
            </section>
        </PageWrapper>
    )
}