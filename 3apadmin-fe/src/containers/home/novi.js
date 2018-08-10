import React from 'react';

let Novi = function statelessFunctionComponentClass(props) {


    let row = function () {
      if(props.rows && props.rows > 0){
          switch (props.rows){
              case '1':
                  return 'row-span-1';
              case '2':
                  return 'row-span-2';
              case '3':
                  return 'row-span-3';
              case '4':
                  return 'row-span-4';
              case '5':
                  return 'row-span-5';
              case '6':
                  return 'row-span-6';
              case '7':
                  return 'row-span-7';
              case '8':
                  return 'row-span-8';
              case '9':
                  return 'row-span-9';
              case '10':
                  return 'row-span-10';
              default:
                  return 'row-span-3';
          }


      } else {
          return 'row-span-3';
      }
    };
    let col = function () {
        if(props.columns && props.columns > 0){
            switch (props.columns){
                case '1':
                    return 'column-span-1';
                case '2':
                    return 'column-span-2';
                default:
                    return 'column-span-2';
            }


        } else {
            return 'column-span-2';
        }
    };

    let aaa = row()+' '+col();

    return (
        <div>RADI!</div>
    );
};

export default Novi;
