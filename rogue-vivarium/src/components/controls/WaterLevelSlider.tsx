import { Slider } from "@mui/material"
interface Props {
  setWaterLevel: React.Dispatch<React.SetStateAction<number>>,
  waterLevel: number
}

export const WaterLevelSlider = ({setWaterLevel, waterLevel}: Props) => {
  const marks = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 25,
      label: 25,
    },
    {
      value: 50,
      label: 50,
    },
    {
      value: 75,
      label: 75,
    },
    {
      value: 100,
      label: 100,
    }
  ]
  
  const handleChange = (event: Event, newValue: number | number[]) => {
    setWaterLevel(newValue as number);
  }
  
  return (
    <div style={{width:400}}>
    <div>Water Level %</div>
    <Slider 
      step={1}
      aria-label="Frequency"
      valueLabelDisplay="auto"
      value={waterLevel}
      onChange={handleChange}
      defaultValue={25}
      min={0}
      max={100}
      marks={marks}
    />
    </div>
  );
}