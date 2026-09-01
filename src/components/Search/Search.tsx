
import { FaSearch } from "react-icons/fa";

export interface SearchProps{
 value: string;
 onChange: (value:string)=> void;
    placeholder?:string;

}

export const Search=({value, onChange, placeholder= "Search list"}:SearchProps) =>{
    return (
    <div>
        <FaSearch/>
        <label>Search</label>
        <input type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}/>
        </div>
        
    )
}