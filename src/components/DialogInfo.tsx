export default function DialogInfo({ info, setInfo }) {
    console.log(info);
    if (!info)return null
    
  return (
    <dialog className='bg-blend-color' open={info}>
      <p>DialogInfo</p>
      <form>
        <h4 className='text-[red]'>{info?.name}</h4>
        <h4 className='text-[red]'>{info?.age}</h4>
        <h4 className='text-[red]'>{info?.status ? "active" : "inactive"}</h4>
        <h4 className='text-[red]'>{info?.job}</h4>
        <h4 className='text-[red]'>{info?.phone}</h4>
        <button type='button' onClick={()=>setInfo(null)}>cancel</button>
        <button type='submit' >add</button>
      </form>
    </dialog>
  )
}
