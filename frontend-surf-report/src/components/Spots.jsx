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
    <Carousel>
      <CarouselContent className="flex justify-center">
        {spots.map((element) => (
          <CarouselItem
            className="basis-full md:basis-1/2 min-w-xs lg:basis-1/3 xl:basis-1/4  sm:w-25 md:w-35 lg:w-50 xl:w-full"
            key={element.id}
          >
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
      <CarouselPrevious className="hover:cursor-pointer" />
      <CarouselNext className="hover:cursor-pointer" />
    </Carousel>
  );
};

export default Spots;
