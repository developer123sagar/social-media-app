import Menubar from "@/components/Menubar";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
      <Menubar className="sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80" />
      <div className="my-12 w-full space-y-3 text-center">
        <h1 className="text-3xl font-bold">Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </main>
  );
}
