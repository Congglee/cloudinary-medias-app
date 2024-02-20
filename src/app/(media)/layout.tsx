import { SideMenu } from "@/components/side-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid lg:grid-cols-5 gap-4 container">
      <div className="pb-12 hidden lg:block">
        <div className="space-y-4 py-4">
          <div className="pr-4 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Manage
            </h2>
            <SideMenu />
          </div>
        </div>
      </div>
      <div className="col-span-3 lg:col-span-4 pt-8">{children}</div>
    </div>
  );
}
