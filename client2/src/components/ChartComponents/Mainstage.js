import { useRef, useState, useCallback, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Stage, Layer } from "./react-konva";
import Section from "./Section";
import SeatPopup from "./SeatPopup";
import * as layout from "./layout";
import {seatPicker} from '../../actions/SeatAction';

const useFetch = url => {
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log(url)
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data));
  }, [url]);
  return data;
};
//refer to async await


const Mainstage = props => {
  const jsonData = useFetch("./solo-data.json");
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  const [scale, setScale] = useState(1);
  const [scaleToFit, setScaleToFit] = useState(1);
  const [size, setSize] = useState({
    width: 500,
    height: 500,
    virtualWidth: 500
  });

  const [virtualWidth, setVirtualWidth] = useState(500);

  const [selectedSeatsIds, setSelectedSeatsIds] = useState([]);

  const [popup, setPopup] = useState({ seat: null });

  const dispatch = useDispatch();

  const seatStuff = useSelector(state => state.selectedSeats.seatIds);




  // calculate available space for drawing
  useEffect(() => {
    const newSize = {
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight
    };
    if (newSize.width !== size.width || newSize.height !== size.height) {
      setSize(newSize);
    }
  });

  // calculate initial scale
  useEffect(() => {
    if (!stageRef.current) {
      return;
    }
    const stage = stageRef.current;
    const clientRect = stage.getClientRect({ skipTransform: true });

    const scaleToFit = size.width / clientRect.width;
    setScale(scaleToFit);
    setScaleToFit(scaleToFit);
    setVirtualWidth(clientRect.width);
  }, [jsonData, size]);

  // togle scale on double clicks or taps
  const toggleScale = useCallback(() => {
    if (scale === 1) {
      setScale(scaleToFit);
    } else {
      setScale(1);
    }
  }, [scale, scaleToFit]);

  let lastSectionPosition = 0;

  const handleHover = useCallback((seat, pos) => {
    setPopup({
      seat: seat,
      position: pos
    });
  }, []);

  const handleSelect = useCallback(
      seatId =>{
      const newIds = selectedSeatsIds.concat([seatId]);
      setSelectedSeatsIds(newIds);
      console.log(newIds);
      dispatch(seatPicker(newIds))
    },
    [selectedSeatsIds],

    console.log(seatStuff)
  );

  const handleDeselect = useCallback(
    seatId => {
      const ids = selectedSeatsIds.slice();
      ids.splice(ids.indexOf(seatId), 1);
      setSelectedSeatsIds(ids);
      dispatch(seatPicker(ids))
    },
    [selectedSeatsIds]
  );

  if (jsonData === null) {
    return <div ref={containerRef}>Loading...</div>;
  }

  const maxSectionWidth = layout.getMaximimSectionWidth(
    jsonData.seats.sections
  );

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#354152",
        border: "1px solid yellow",
        width: "40vw",
        height: "40vh"
      }}
      ref={containerRef}
    >
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}
        draggable
        dragBoundFunc={pos => {
          pos.x = Math.min(
            size.width / 2,
            Math.max(pos.x, -virtualWidth * scale + size.width / 2)
          );
          pos.y = Math.min(size.height / 2, Math.max(pos.y, -size.height / 2));
          return pos;
        }}
        onDblTap={toggleScale}
        onDblClick={toggleScale}
        scaleX={scale}
        scaleY={scale}
      >
        <Layer>
          {jsonData.seats.sections.map((section, index) => {
            const height = layout.getSectionHeight(section);
            const position = lastSectionPosition + layout.SECTIONS_MARGIN;
            lastSectionPosition = position + height;
            const width = layout.getSectionWidth(section);

            const offset = (maxSectionWidth - width) / 2;

            return (
              <Section
                x={offset}
                y={position}
                height={height}
                key={index}
                section={section}
                selectedSeatsIds={selectedSeatsIds}
                // onHoverSeat={handleHover}
                onSelectSeat={handleSelect}
                onDeselectSeat={handleDeselect}
              />
            );
          })}
        </Layer>
      </Stage>
      {/* draw popup as html */}
      {popup.seat && (
        <SeatPopup
          position={popup.position}
          seatId={popup.seat}
          onClose={() => {
            setPopup({ seat: null });
          }}
        />
      )}
    </div>
  );
};

export default Mainstage;

//useEffect(() => {
//   const updatePosts = async() => {
//     const url = `http://localhost:3001/forum`
//     const response = await fetch(url)
//     const data = await response.json()
//     dispatch(groupPosts(data));
// }
// updatePosts();
// }, [viewPosts])
