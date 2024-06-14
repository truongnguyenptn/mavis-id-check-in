import { Checkin } from "src/components/check-in"

const RootPage = () => {
  return (
      <div className="flex h-screen w-screen items-stretch justify-start">
        <div className="flex-[7] overflow-auto bg-background p-20">
            <Checkin />
        </div>
      </div>
  )
}

export default RootPage
