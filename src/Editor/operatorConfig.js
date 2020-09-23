export default [
  {value: '\u00AC', elType: 'N', precedence: 0},  // NOT
  {value: '\u2228', elType: 'O', precedence: 1},  // OR
  {value: '\u2227', elType: 'O', precedence: 2},  // AND
  {value: '\u21D2', elType: 'O', precedence: 3},  // IF..THEN
  {value: '\u21D4', elType: 'O', precedence: 3},  // IFF
  {value: '\u22BB', elType: 'O', precedence: 3},  // XOR
  {value: '(',      elType: 'G'},                 // OPEN PAREN
  {value: ')',      elType: 'G'},                 // CLOSE PAREN
];
