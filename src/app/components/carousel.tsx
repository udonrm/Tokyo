import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarouselComp = ({ children }) => {
  <Carousel>
    <CarouselContent>
      <CarouselItem>{children}</CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>;
};

export default CarouselComp;
