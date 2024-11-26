import { File } from "@/types"
const url = import.meta.env.VITE_APP_API_BASE_URL + "/file"

const sizeKeta = ['B', 'KB', 'MB', 'GB', 'TB']

const sizeFitter = (size: number) => {
    let keta = 0
    while (size >= 1024) {
        size /= 1024
        keta += 1
    }
    return String(size.toFixed(2)) + sizeKeta[keta];
}

const sortFiles = (items:File[], fileMae:boolean=true, sortRevert:boolean=false, sortBy="name") => {
    items.sort((a:any, b:any) => {
        // Sort by dir (true comes before false)
        if (a.dir != b.dir) {
            return fileMae ? a.dir - b.dir : b.dir - a.dir;
        }
        // Sort by name if dir is the same
        return sortRevert ? b[sortBy].localeCompare(a.name) : a[sortBy].localeCompare(b.name);
    })
    return items
}

export { url, sizeFitter, sortFiles }