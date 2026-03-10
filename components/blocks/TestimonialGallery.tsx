"use client"

import { useState } from "react";
import Image from "next/image";
import { IoChevronBackCircleOutline, IoChevronForwardCircleOutline } from "react-icons/io5";
import TestimonialsImage from "@/assets/testimonials.jpg"

type TestimonialGalleryProps = {
    testimonials: {
        id: number;
        text: string;
        name: string;
        createdAt: string;
        updatedAt: string;
    }[];
    className?: string;
}

export default function TestimonialGallery({ testimonials, className }: TestimonialGalleryProps) {
    const [index, setIndex] = useState(0);

    const galleryPrev = () => {
        if (index > 0) {
            setIndex(index - 1)
        } else {
            setIndex(testimonials.length - 1)
        }
    }
    const galleryNext = () => {
        if (index < testimonials.length - 1) {
            setIndex(index + 1)
        } else {
            setIndex(0)
        }
    }

    return (
        <section className={`py-8 px-0! *:px-default min-h-85 flex justify-center items-center relative text-app-white text-center ${className ? className : ""}`}>
            <div className="flex flex-col items-center gap-6 z-3">
                <h3 className="text-2xl font-bold">A word from<br />other Believers</h3>

                <div className="flex flex-col items-center gap-3">
                    <p>{testimonials[index].text}</p>
                    <p className="font-semibold">{testimonials[index].name}</p>

                    <div className="flex gap-3 *:size-11 *:hover-75">
                        <IoChevronBackCircleOutline onClick={galleryPrev} />
                        <IoChevronForwardCircleOutline onClick={galleryNext} />
                    </div>
                </div>
            </div>

            <figure className="px-0! size-full *:size-full absolute z-0">
                <div className="bg-black/50 absolute z-1"></div>
                <Image
                    src={TestimonialsImage}
                    alt="Background element"
                    width={410}
                    height={321}
                    className="object-cover"
                />
            </figure>
        </section>
    )
}