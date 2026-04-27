import MiiDetails from "@/components/MiiDetails";

export default async function MiiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Mock data for the specific Mii. In reality, you'd fetch from Prisma using the id
  const mockMii = {
    id: id,
    name: "Jefazo",
    series: "Tomodachi",
    imageUrl: null,
    basicDetails: "Pelo afro negro, ojos grandes, nariz pequeña",
    proInstructions: null // Will trigger the mock instructions inside MiiDetails component for demo purposes
  };

  return (
    <main className="flex min-h-screen flex-col items-center py-20">
      <MiiDetails mii={mockMii} isLiked={false} />
    </main>
  );
}
