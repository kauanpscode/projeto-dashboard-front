import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './style.css';

export default function UserTable(dados) {
  function decimalToTime(decimal) {
    const hours = Math.floor(decimal);
    let minutes = Math.round((decimal - hours) * 60);

    if (minutes === 60) {
      minutes = 0;
      return `${String(hours + 1).padStart(2, '0')}:00`;
    }

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  const getPercentageColor = percent => {
    if (percent === '-') return '#ccc';
    if (percent >= 89) return '#C8E6C9';
    if (percent >= 60) return '#FFF9C4';
    return '#FFCDD2';
  };

  const tratarNome = nome => {
    const partes = nome.split('.');
    partes[0] = partes[0].charAt(0).toUpperCase() + partes[0].slice(1);
    return partes.join(' ');
  };

  return (
    <TableContainer className="table-container">
      <Table size="small" className="table">
        <TableHead>
          <TableRow className="thead">
            <TableCell align="center">USUÁRIO</TableCell>
            <TableCell align="center">CANAL</TableCell>
            <TableCell align="center">TURNO</TableCell>
            <TableCell align="center">PRODUTIVIDADE (%)</TableCell>
            <TableCell align="center">TMA</TableCell>
            <TableCell align="center">META</TableCell>
            <TableCell align="center">META (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(dados).map(([name, data]) => (
            <TableRow key={name} className="table-row">
              <TableCell component="th" scope="row">
                {tratarNome(name)}
              </TableCell>
              <TableCell align="center">{data.channel}</TableCell>
              <TableCell align="center">{data.turno}</TableCell>
              <TableCell align="center">{data.produtividade}</TableCell>
              <TableCell align="center">{decimalToTime(data.tma)}</TableCell>
              <TableCell align="center">{data.meta}</TableCell>
              <TableCell
                align="center"
                style={{
                  backgroundColor: getPercentageColor(data.porcentagem),
                  fontWeight: 'bold',
                  padding: '8px',
                }}
              >
                {data.porcentagem}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
