export default [
  {value: '\u00AC', elType: 'N', precedence: 0, tooltip: 'negation'},  // NOT
  {value: '\u2228', elType: 'O', precedence: 1, tooltip: 'disjunction'},  // OR
  {value: '\u2227', elType: 'O', precedence: 2, tooltip: 'conjunction'},  // AND
  {value: '\u21D2', elType: 'O', precedence: 3, tooltip: 'material conditional'},  // IF..THEN
  {value: '\u21D4', elType: 'O', precedence: 3, tooltip: 'biconditional'},  // IFF
  {value: '\u22BB', elType: 'O', precedence: 3, tooltip: 'exclusive or'},  // XOR
  {value: '(',      elType: 'G', tooltip: 'open parenthesis'},                 // OPEN PAREN
  {value: ')',      elType: 'G', tooltip: 'close parenthesis'},                 // CLOSE PAREN
];
