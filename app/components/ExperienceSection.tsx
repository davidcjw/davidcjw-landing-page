"use client";

import ContainerScroll from "./ContainerScroll";
import ExperienceCard from "./ExperienceCard";
import { experiences } from "../data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-gray-900">
      <ContainerScroll
        header={
          <div>
            <p className="text-indigo-400 text-sm font-medium tracking-widest uppercase mb-3">
              Career
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Work Experience
            </h2>
            <p className="text-gray-400 mt-3 text-base max-w-md mx-auto">
              From finance to AI to cloud infrastructure — a non-linear journey through tech.
            </p>
          </div>
        }
      >
        <div>
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} {...exp} index={i} />
          ))}
        </div>
      </ContainerScroll>
    </section>
  );
}
