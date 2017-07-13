export function turnTile(row, column, tileData)
{
  return {
    type: "TURN_TILE",
    payload: Promise.resolve({
      tileData: tileData,
      row: row,
      column: column
    })
  };
}
