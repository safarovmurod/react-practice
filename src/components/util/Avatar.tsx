import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarDropdown({ img }: { img: any }) {   
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={img?.img} alt={img?.name} />
        <AvatarFallback>{img?.name?.slice(0, 2) || "U"}</AvatarFallback>
      </Avatar>
      <span>{img?.name}</span>
    </div>
  )
}
