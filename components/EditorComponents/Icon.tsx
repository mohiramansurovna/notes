import React, {useState, Suspense} from 'react';
import LoadingShort from '../LoadingShort';

const LazySiNotepadplusplus = React.lazy(() =>
    import('react-icons/si').then((module) => ({default: module.SiNotepadplusplus}))
);
const LazyTiWeatherShower = React.lazy(() =>
    import('react-icons/ti').then((module) => ({default: module.TiWeatherShower}))
);
const LazyTiWeatherSnow = React.lazy(() =>
    import('react-icons/ti').then((module) => ({default: module.TiWeatherSnow}))
);
const LazyTiWeatherSunny = React.lazy(() =>
    import('react-icons/ti').then((module) => ({default: module.TiWeatherSunny}))
);
const LazyTiWeatherStormy = React.lazy(() =>
    import('react-icons/ti').then((module) => ({default: module.TiWeatherStormy}))
);
const LazyMdOutlineNightlightRound = React.lazy(() =>
    import('react-icons/md').then((module) => ({default: module.MdOutlineNightlightRound}))
);
const LazyGiMusicalNotes = React.lazy(() =>
    import('react-icons/gi').then((module) => ({default: module.GiMusicalNotes}))
);
const LazyPiGameControllerDuotone = React.lazy(() =>
    import('react-icons/pi').then((module) => ({default: module.PiGameControllerDuotone}))
);
const LazyGiSly = React.lazy(() =>
    import('react-icons/gi').then((module) => ({default: module.GiSly}))
);

export enum IconId {
    Notepad = '0',
    Shower = '1',
    Snow = '2',
    Sunny = '3',
    Stormy = '4',
    Nightlight = '5',
    MusicalNotes = '6',
    GameController = '7',
    Sly = '8',
}

const icons = {
    [IconId.Notepad]: LazySiNotepadplusplus,
    [IconId.Shower]: LazyTiWeatherShower,
    [IconId.Snow]: LazyTiWeatherSnow,
    [IconId.Sunny]: LazyTiWeatherSunny,
    [IconId.Stormy]: LazyTiWeatherStormy,
    [IconId.Nightlight]: LazyMdOutlineNightlightRound,
    [IconId.MusicalNotes]: LazyGiMusicalNotes,
    [IconId.GameController]: LazyPiGameControllerDuotone,
    [IconId.Sly]: LazyGiSly,
};

export default function Icon({
    form,
}: {
    form: any;
}) {
    const [hid, setHid] = useState<boolean>(true);
    return (
        <div >
            <div
                className='h-full w-14 cursor-pointer text-4xl'
                onClick={() => setHid(!hid)}>
                <Suspense fallback={<LoadingShort />}>
                    {React.createElement(icons[form.getValues('icon') as IconId])}
                </Suspense>
            </div>
            {!hid && (
                <div
                    className={`absolute -left-2 top-0 grid h-44 w-44 grid-cols-3 gap-2 rounded-xl p-2 bg-asidebg dark:bg-darkasidebg`}>
                    {Object.entries(icons).map(([key, Icon]) => (
                        <div
                            key={key}
                            className={`flex items-center justify-center w-12 h-12 text-4xl cursor-pointer rounded-md ${
                                form.getValues('icon') === key ? 'bg-purple-300' : ''
                            }`}
                            onClick={() => {
                                form.setValue('icon', key as IconId);
                                setHid(true);
                            }}>
                            <Suspense fallback={<LoadingShort />}>
                                {React.createElement(Icon)}
                            </Suspense>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export function SendIcon({icon}: {icon: string}) {
    return (
        <div className='text-asideIcon self-center text-3xl *:m-0 *:p-0'>
            <Suspense fallback={<LoadingShort />}>
                {React.createElement(icons[icon as IconId])}
            </Suspense>
        </div>
    );
}
