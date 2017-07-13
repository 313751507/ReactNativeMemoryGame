var tileStates = {
  block: 'BLOCK',
  flipped: 'FLIPPED',
  played: 'PLAYED'
};

export function CreateTile(imageUrl, tileNumber)
{
  return {
    state: tileStates.block,
    imgUrl: imageUrl,
    tileNumber: tileNumber
  };
}

export function TileStates()
{
  return {...tileStates};
}

export function IsTileFlipped(tileData)
{
  return (tileData.state.localeCompare(tileStates.flipped) === 0);
}

export function IsTileBlocked(tileData)
{
  return (tileData.state.localeCompare(tileStates.block) === 0);
}

export function IsTilePlayed(tileData)
{
  return (tileData.state.localeCompare(tileStates.played) === 0);
}

export function GetTileImage(tileData)
{
  return tileData.imgUrl;
}

export function GetTileNumber(tileData)
{
  return tileData.tileNumber;
}

export function FlipTile(tileData)
{
  if (tileData.state.localeCompare(tileStates.block) === 0)
  {
    return {
      ...tileData,
      state: tileStates.flipped
    };
  }

  return tileData;
}

export function BlockTile(tileData)
{
  if (tileData.state.localeCompare(tileStates.flipped) === 0)
  {
    tileData.state = tileStates.block;
  }
}

export function MakeTilePlayed(tileData)
{
  if (tileData.state.localeCompare(tileStates.flipped) === 0)
  {
    tileData.state = tileStates.played;
  }

  return tileData;
}
