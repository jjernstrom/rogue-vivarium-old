import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

interface Props {
  setTileSize: React.Dispatch<React.SetStateAction<number>>
}

export const TileSizeRadio = ({setTileSize}: Props) => {
  
  const handleMapSizeChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setTileSize(+value)
  }

  return (
    <FormControl>
        <FormLabel>Resolution</FormLabel>
        <RadioGroup onChange={handleMapSizeChange}>
          <FormControlLabel value='1' control={<Radio />} label="1:1" />
          <FormControlLabel value='2' control={<Radio />} label="2:1" />
          <FormControlLabel value='4' control={<Radio />} label="4:1" />
        </RadioGroup>
      </FormControl>
  )
}