import { ScrollArea } from "@/components/ui/scroll-area";
import { Compass, Palmtree } from "lucide-react";

export default function ArchaeologicalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#1c1917] bg-[url('/assets/stone-pattern-dark.png')] bg-repeat">
      {/* Roman columns header */}
      <header className="border-b border-amber-900/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="h-8 w-8 text-amber-600" />
              <h1 className="text-2xl font-serif text-amber-100">
                Sbiba Heritage
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <NavLink href="/movie-generation" icon={Palmtree}>
                Movie Generation
              </NavLink>
              <NavLink href="/reconstruction" icon={Box3d}>
                3D Reconstruction
              </NavLink>
            </div>
          </nav>
        </div>
      </header>

      {/* Main content with scroll area */}
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <main className="container mx-auto px-4 py-8">{children}</main>
      </ScrollArea>
    </div>
  );
}

const NavLink = ({ href, children, icon: Icon }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-amber-200 hover:bg-amber-900/20 transition-colors"
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{children}</span>
    </Link>
  );
};