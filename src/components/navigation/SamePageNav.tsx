import Link from "next/link";
import { GET_SINGLE_NAV } from "@/lib/gql/queries/navigations";
import { Navigation, Link as NavLink } from "@/lib/gql/queries/navigations";

export default async function SamePageNav({ navId }: { navId: string }) {
  console.log("navId passed to SamePageNav:", navId);

  try {
    const navigation = await GET_SINGLE_NAV({ navId });

    if (!navigation) {
      console.warn("No navigation data returned from the server.");
      return <div>Error loading navigation</div>;
    }

    const navItems = Array.isArray(navigation.link)
      ? navigation.link
      : [navigation.link]; // Ensure `navItems` is always an array

    console.log("Navigation items:", navItems);

    if (!Array.isArray(navItems) || navItems.length === 0) {
      console.warn("No navigation items available.");
      return <div>No navigation items available</div>;
    }

    return (
      <ul>
        {navItems.map((navItem) => {
          const url = navItem.page?.slug || navItem.externalUrl;
          console.log(url);
          return (
            <li key={navItem.id}>
              <Link href={`#${url}`}>{navItem.text}</Link>
            </li>
          );
        })}
      </ul>
    );
  } catch (error) {
    console.error("Error fetching navigation data:", error);
    return <div>Error loading navigation</div>;
  }
}
