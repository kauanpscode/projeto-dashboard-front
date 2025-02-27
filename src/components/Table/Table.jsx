import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './style.css'; // Importando o CSS separado

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

  const getPercentageColor = (percent) => {
    if (percent === "-") return '#a1b4d7';
    if (percent >= 89) return '#b9d7a1';
    if (percent >= 60) return '#fcdc50';
    return '#f44336';
  };

  return (
    <TableContainer component={Paper} className="table-container">
      <Table size="small" sx={{ minWidth: 500, '& td, & th': { padding: '3px' } }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">USUÁRIO</TableCell>
            <TableCell align="center">CANAL</TableCell>
            <TableCell align="center">TURNO</TableCell>
            <TableCell align="center">TMA</TableCell>
            <TableCell align="center">PRODUTIVIDADE (%)</TableCell>
            <TableCell align="center">META</TableCell>
            <TableCell align="center">PORCENTAGEM</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(dados).map(([name, data]) => (
            <TableRow key={name}>
              <TableCell component="th" scope="row">{name}</TableCell>
              <TableCell align="center">{data.channel}</TableCell>
              <TableCell align="center">{data.turno}</TableCell>
              <TableCell align="center">{decimalToTime(data.tma)}</TableCell>
              <TableCell align="center">{data.produtividade}</TableCell>
              <TableCell align="center">{data.meta}</TableCell>
              <TableCell align="center" className='percentage-cell' style={{
                backgroundColor: getPercentageColor(data.porcentagem),
                fontWeight: "bold",
                borderRadius: "5px",
              }}>
                {data.porcentagem}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}
