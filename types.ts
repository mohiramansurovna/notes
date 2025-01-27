
export type Fonts =
    | 'irina-sans'
    | 'kite-one'
    | 'alkatra'
    | 'courgette'
    | 'doto'
    | 'miltonian'
    | 'akronim';

export type State = {
    color: string;
    backgroundColor: string;
    fontWeight: 'thin'|'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
    fontSize: number;
    fontStyle: 'normal' | 'italic';
    fontFamily: Fonts;
    textDecoration: 'none' | 'underline' | 'overline' | 'line-through' | 'blink';
    textTransform: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    letterSpacing: number;
    lineHeight: number | 'inherit';
    textAlign: 'left' | 'right' | 'center' | 'justify';
    textShadow: [string, string, string] | 'none';
    marginLeft: number;
    marginTop: number;
};
export type Action = {
    type:
        | 'color'
        | 'backgroundColor'
        | 'fontWeight'
        | 'fontSize'
        | 'fontStyle'
        | 'fontFamily'
        | 'textDecoration'
        | 'textTransform'
        | 'letterSpacing'
        | 'lineHeight'
        | 'textAlign'
        | 'textShadow'
        | 'marginLeft'
        | 'marginTop'
        | 'init';
    payload: string | number | State;
};
export type ProfileImage = {
    url: string;
    miniUrl: string | null;
};

