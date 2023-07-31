import Container from "@components/Container";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: "Playa",
        icon: TbBeach,
        description: "Esta propiedad está cerca de la playa!",
    },
    {
        label: "Campo",
        icon: GiWindmill,
        description: "Esta propiedad está cerca del campo!",
    },
    {
        label: "Moderno",
        icon: MdOutlineVilla,
        description: "Esta propiedad está cerca de la ciudad!",
    },
    {
        label: "Montaña",
        icon: TbMountain,
        description: "Esta propiedad está cerca de la cordillera!",
    },
    {
        label: "Piscina",
        icon: TbPool,
        description: "Esta propiedad tiene piscina!",
    },
    {
        label: "Isla",
        icon: GiIsland,
        description: "Esta propiedad está en una isla!",
    },
    {
        label: "Lago",
        icon: GiBoatFishing,
        description: "Esta propiedad está en un lago!",
    },
    {
        label: "Esquí",
        icon: FaSkiing,
        description: "Esta propiedad está cerca de un centro de esquí!",
    },
    {
        label: "Castillos",
        icon: GiCastle,
        description: "Esta propiedad está cerca de un castillo!",
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "Esta propiedad tiene camping",
    },
    {
        label: "Ártico",
        icon: BsSnow,
        description: "Esta propiedad está cerca del ártico!",
    },
    {
        label: "Cuevas",
        icon: GiCaveEntrance,
        description: "Esta propiedad está cerca de cuevas!",
    },
    {
        label: "Desierto",
        icon: GiCactus,
        description: "Esta propiedad está cerca del desierto!",
    },
    {
        label: "Granja",
        icon: GiBarn,
        description: "Esta propiedad está tiene una granja!",
    },
    {
        label: "Lujoso",
        icon: IoDiamond,
        description: "Esta propiedad está es lujosa!",
    }
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();

    const isMainPage = pathname === "/"
    if(!isMainPage){
        return null;
    }

  return <div>
    <Container>
        <div 
        className="
        pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto">
            {categories.map((item) => (
                <CategoryBox 
                key={item.label}
                label={item.label}
                selected={category === item.label}
                icon={item.icon}
                />
            ))}
        </div>
    </Container>
  </div>;
};

export default Categories;
