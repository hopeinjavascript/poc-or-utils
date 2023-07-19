import React from 'react';

// helpers
function throwError(msg) {
  throw new Error(' -- ' + msg);
}

// context
const CheckboxContext = React.createContext(null);

const CheckboxContextProvider = ({ children }) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <CheckboxContext.Provider value={{ checked, setChecked }}>
      {children}
    </CheckboxContext.Provider>
  );
};

const useCheckboxContext = () => React.useContext(CheckboxContext);

// components
const CheckboxWrapper = ({ children }) => {
  // const [checked, setChecked] = React.useState(false);

  /* 1. 
  // React.children only iterate onr-level deep
  const allChildren = React.Children.map(children, (child) => {
    console.count(child);

    // whitelisting of elements
    if (child.type !== Label && child.type !== CheckboxInput) {
      return null;
      // throwError(
      // `No DOM or custom element supported other than <Label/> and <CheckboxInput/>`
      // );
    }

    const clonedChild = React.cloneElement(child, { checked, setChecked });
    return clonedChild;
  });

  return allChildren;
  */

  /* 2. */

  return <CheckboxContextProvider> {children} </CheckboxContextProvider>;
};

//prolly name it as CheckboxLabel
const Label = ({ children }) => {
  // const checkboxContext = React.useContext(CheckboxContext);
  const checkboxContext = useCheckboxContext();

  if (!checkboxContext) {
    throwError(
      'Label should be called from <CheckboxWrapper/> component only!'
    );
  }

  const { checked, setChecked } = checkboxContext;
  console.log({ checked });

  return (
    <label onClick={() => setChecked((prevState) => !prevState)}>
      {children ?? (checked ? 'Checked' : 'Unchecked')}
    </label>
  );
};

const CheckboxLabel = Label;

const CheckboxInput = () => {
  // const [_checked, _setChecked] = React.useState(!!checked); // !!undefined

  // const checkboxContext = React.useContext(CheckboxContext);
  const checkboxContext = useCheckboxContext();

  if (!checkboxContext) {
    throwError(
      'CheckboxInput should be called from <CheckboxWrapper/> component only!'
    );
  }

  const { checked, setChecked } = checkboxContext;

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={() => setChecked((prevState) => !prevState)}
      // checked={_checked}
      // onChange={(e) => {
      //   _setChecked(e.target.checked);
      //   if (setChecked) {
      //     setChecked(e.target.checked);
      //   }
      // }}
    />
  );
};

const P = ({ children }) => <p> {children} </p>;

export default function App() {
  return (
    <div className="App">
      <CheckboxWrapper>
        {/* <p> Paragraph </p> */}
        <P> P Custom Element </P>
        <hr />
        <div>
          <CheckboxInput />
        </div>
        {/* <br /> */}
        {/* React.children only iterate onr-level deep, so we use Context API which injects values down the tree at any level */}
        {/* Notice how our custom checkbox components are nested and are still be able to preserve the state and be related/compounded to one another */}
        <div>
          <p>
            {/* <P> P Custom Element </P> */}
            <CheckboxLabel>Check me!</CheckboxLabel>
          </p>
        </div>
      </CheckboxWrapper>
    </div>
  );

  // return <Label>Hey</Label>;

  // return <CheckboxInput />;
}
