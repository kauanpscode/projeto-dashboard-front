import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './style.css'

export default function UserTable(dados) {
  function decimalToTime(decimal) {
    const minutes = Math.floor(decimal * 60); // Converte decimal para minutos
    const seconds = Math.round((decimal * 60 - minutes) * 60); // Converte parte decimal para segundos
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  // Exemplo de uso:
  console.log("aaa",decimalToTime(0.2520833333333334)); // Saída esperada: "02:37"
  

  const getPercentageColor = (percent) => {
    if (percent >= 100) return '#b9d7a1'; // Verde se atingir ou ultrapassar a meta
    if (percent >= 75) return '#fcdc50'; // Amarelo se estiver entre 75% e 99%
    return '#f44336'; // Vermelho se for menor que 75%s
  };
    return (
      <TableContainer component={Paper}>
      <Table size="small" sx={{ minWidth: 500, '& td, & th': { padding: '3px' } }}>
      <TableHead>
            <TableRow>
              <TableCell align="center">Usuário</TableCell>
              <TableCell align="center">Canal</TableCell>
              <TableCell align="center">Turno</TableCell>
              <TableCell align="center">TMA</TableCell>
              <TableCell align="center">Produtividade (%)</TableCell>
              <TableCell align="center">Meta</TableCell>
              <TableCell align="center">Porcentagem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(dados).map(([name, data]) => (
              <TableRow key={name}>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="center">{data.channel}</TableCell>
                <TableCell align="center">{data.turno}</TableCell>
                <TableCell align="center">{decimalToTime(data.tma)}</TableCell>
                <TableCell align="center">{data.produtividade}</TableCell>
                <TableCell align="center">{data.meta}</TableCell>
                <TableCell align="center" className='percentage-cell' style={{
                backgroundColor: getPercentageColor(data.porcentagem),
                fontWeight: "bold", // Negrito
                borderRadius: "5px",
                }}>{data.porcentagem}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
