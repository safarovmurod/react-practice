import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SheetInfo({ info, setInfo }: any) {
  return (
    <Sheet open={Boolean(info)} onOpenChange={(open) => !open && setInfo(null)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>User Information</SheetTitle>
          <SheetDescription>
            Detailed information about the selected user.
          </SheetDescription>
        </SheetHeader>

        {info && (
          <div className="grid gap-6 px-4 py-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border">
              <Avatar className="h-16 w-16 ring-2 ring-border shadow-xs">
                <AvatarImage src={info?.img} alt={info?.name} />
                <AvatarFallback>{info?.name?.slice(0, 2) || "U"}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-foreground truncate">{info?.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{info?.job}</p>
              </div>
            </div>

            <div className="grid gap-2 text-sm">
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/20">
                <span className="text-muted-foreground font-medium">Age:</span>
                <span className="font-semibold text-foreground">{info?.age || "—"}</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/20">
                <span className="text-muted-foreground font-medium">City:</span>
                <span className="font-semibold text-foreground">{info?.city || "—"}</span>
              </div>
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/20">
                <span className="text-muted-foreground font-medium">Status:</span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    info?.status ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                  }`}
                >
                  {info?.status ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        )}

        <SheetFooter>
          <Button variant="outline" className="w-full h-10 rounded-lg" onClick={() => setInfo(null)}>
            Cancel
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
