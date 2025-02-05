import React, { useState } from 'react';
import { TiWeatherShower, TiWeatherSnow, TiWeatherStormy, TiWeatherSunny } from 'react-icons/ti';
import { MdOutlineNightlightRound } from 'react-icons/md';
import {SiNotepadplusplus} from 'react-icons/si';
import {GiMusicalNotes, GiSly} from 'react-icons/gi';
import {PiGameControllerDuotone} from 'react-icons/pi';
export enum IconId {
  Notepad = '0',
  Shower = '1',
  Snow = '2',
  Sunny = '3',
  Stormy = '4',
  Nightlight = '5',
  MusicalNotes = '6',
  GameController = '7',
  Sly = '8'
}

const icons = {
  [IconId.Notepad]: <SiNotepadplusplus />,
  [IconId.Shower]: <TiWeatherShower />,
  [IconId.Snow]: <TiWeatherSnow />,
  [IconId.Sunny]: <TiWeatherSunny />,
  [IconId.Stormy]: <TiWeatherStormy />,
  [IconId.Nightlight]: <MdOutlineNightlightRound />,
  [IconId.MusicalNotes]: <GiMusicalNotes />,
  [IconId.GameController]: <PiGameControllerDuotone />,
  [IconId.Sly]: <GiSly />
};

export default function Icon({ form, color, backgroundColor }: { form: any; color: string; backgroundColor: string }) {
  const [hid, setHid] = useState<boolean>(true);
  return (
    <div className={`text-${color}`}>
      <div
        className="h-full w-14 cursor-pointer text-4xl"
        onClick={() => setHid(!hid)}
      >
        {icons[form.getValues('icon') as IconId]}
      </div>
      {!hid && (
        <div className={`absolute -left-2 top-0 grid h-44 w-44 grid-cols-3 gap-2 rounded-xl p-2 bg-asidebg dark:bg-darkasidebg`}>
          {Object.entries(icons).map(([key, Icon]) => (
            <div
              key={key}
              className={`flex items-center justify-center w-12 h-12 text-4xl cursor-pointer rounded-md ${
                form.getValues('icon') === key
                  ? 'bg-purple-300'
                  : ''
              }`}
              onClick={() => {
                form.setValue('icon', key as IconId);
                setHid(true);
              }}
            >
              {Icon}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SendIcon({ icon }: { icon: string }) {
  return (
    <div className="text-asideIcon self-center text-4xl *:m-0 *:p-0">
      {icons[icon as IconId]}
    </div>
  );
}
