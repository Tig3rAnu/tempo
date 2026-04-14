export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex justify-center h-screen self-center w-full bg-gradients">
      {children}
    </div>
  )
}
