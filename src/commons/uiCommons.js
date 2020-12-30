const uiCommons = {}


uiCommons.getGrid = (noOfColumns) =>
{
    let gridResponse = {};
    switch (noOfColumns) {
        case 2:
        gridResponse.md = 6
        gridResponse.sm = 12
        gridResponse.xs = 12
        break;
        case 4:
            gridResponse.md = 3
            gridResponse.sm = 12
            gridResponse.xs = 12
            break;
        case 3:
            gridResponse.md = 4
            gridResponse.sm = 12
            gridResponse.xs = 12            
            break;

    }

    return gridResponse;
}

export default uiCommons;