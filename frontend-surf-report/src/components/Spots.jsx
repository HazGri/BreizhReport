import React from "react";
import Spot from "./Spot";
import createSlug from "../lib/slug";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

const Spots = ({ spots }) => {
  if (!spots || spots.length === 0) {
    return (
      <div className="text-center text-white font-noto text-lg mt-10 italic">
        Ajoutez des spots en favoris pour les voir ici !
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <CarouselContent>
        {spots.map((element) => (
          <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={element.id}>
            <Link to={`/${createSlug(element.name)}`}>
              <Spot
                title={element.name}
                description={element.description}
                coordinates={element.location.gps}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hover:cursor-pointer hidden sm:flex" />
      <CarouselNext className="hover:cursor-pointer hidden sm:flex" />
    </Carousel>
  );
};

export default Spots;
