import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { routes } from "@/routes";
import { usePathname } from "next/navigation";
import { AlignJustify } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { twMerge } from "tailwind-merge";

const Navbar = () => {
  const path = usePathname();
  const isBreakPoint = useMediaQuery(768);

  const BigScreenComponent = (
    <div className="my-4">
      <NavigationMenu>
        <NavigationMenuList className="flex w-screen justify-around">
          {routes.map((route) => (
            <NavigationMenu key={route.href}>
              <Link href={route.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={path === route.href}
                >
                  {route.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenu>
          ))}

          <div>
            <form action="/auth/signout" method="post">
              <Button type="submit">Logout</Button>
            </form>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );

  const MobileComponent = (
    <Sheet>
      <SheetTrigger>
        <Button variant={"outline"} className="m-4">
          <AlignJustify size={30} />
        </Button>
      </SheetTrigger>
      <SheetContent className="h-screen flex flex-col items-center w-4/5">
        <SheetHeader className="w-full">
          <SheetTitle> FIS </SheetTitle>
          <SheetDescription className="w-full">
            <NavigationMenu className="w-full">
              <NavigationMenuList className="flex flex-col w-full items-baseline">
                {routes.map((route) => (
                  <NavigationMenu key={route.href} className="w-full">
                    <Link
                      href={route.href}
                      legacyBehavior
                      passHref
                      className="w-full"
                    >
                      <NavigationMenuLink
                        className={twMerge(
                          navigationMenuTriggerStyle(),
                          "w-full"
                        )}
                        active={path === route.href}
                      >
                        {route.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenu>
                ))}

                <div>
                  <form action="/auth/signout" method="post">
                    <Button type="submit">Logout</Button>
                  </form>
                </div>
              </NavigationMenuList>
            </NavigationMenu>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );

  return <>{isBreakPoint ? MobileComponent : BigScreenComponent}</>;
};

export default Navbar;
