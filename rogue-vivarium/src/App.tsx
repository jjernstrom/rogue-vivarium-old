import { AppProvider, PageContainer, PageContainerToolbar } from "@toolpad/core";
import { AppProvider as PixiAppProvider, Stage, useApp }  from "@pixi/react";
import { Game } from "./components";
import { MapAnimation } from "./components/MapAnamation";
import { ProceduralDemo } from "./components/ProceduralMapGen/ProceduralDemo";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Vector } from "./types";
import { MapSizeRadio } from "./components/controls/MapSizeRadio";
import { TileSizeRadio } from "./components/controls/TileSizeRadio";
import { FrequencySlider } from "./components/controls/FrequencySlider";
import { WaterLevelSlider } from "./components/controls/WaterLevelSlider";

const PageToolbar = () => {
  return (
    <PageContainerToolbar>
      <div>Experiments in building a simple rogue-lite in a virtual ecosystem</div>
    </PageContainerToolbar>
  );
}

const App = () => {
  const [generate, setGenerate] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<number>(0.1);
  const [gradientGridSize, setGradientGridSize] = useState<number>(255);
  const [tileSize, setTileSize] = useState<number>(5);
  const [mapSize, setMapSize] = useState<Vector>({x:300, y:600});
  const [stageSize, setStageSize] = useState<Vector>({x:1200, y:600});
  
  const [waterLevel, setWaterLevel] = useState<number>(25);
 
return ( 
  <AppProvider
    branding={{ title: 'Rogue Vivarium' }}>
    <PageContainer slots={{ toolbar: PageToolbar}} >
    <Stack display='flex' direction="column" justifyContent='center' gap={10}> 
    <div style={{margin:'auto'}}>
      <Stage height={stageSize.y} width={stageSize.x} > 
        <ProceduralDemo frequency={frequency} mapSize={mapSize} gradientGridSize={gradientGridSize} tileSize={tileSize} generate={generate} waterLevel={waterLevel} />
      </Stage>
    </div>
      <Stack margin='auto' width='100%' gap={2} justifyContent='center' display='flex'> 
      <Button 
        style={{width:'25%', margin:'auto'}} 
        variant="contained" 
        onClick={() => setGenerate(!generate)} >
          Generate
      </Button>
      <FrequencySlider setFrequency={setFrequency} frequency={frequency}/>
      <Stack direction='row' gap={10}>
        <MapSizeRadio setMapSize={setMapSize} setStageSize={setStageSize} setTileSize={setTileSize}/>
        {/* <TileSizeRadio setTileSize={setTileSize} /> */}
        <WaterLevelSlider setWaterLevel={setWaterLevel} waterLevel={waterLevel} />
      </Stack>
    </Stack>
    </Stack>
    </PageContainer>
  </AppProvider>
);
}

export default App;
