export function translateStatus(status: string): string {
  switch (status) {
    case 'NEW':
      return 'Новый';
    case 'IN_PROGRESS':
      return 'В работе';
    case 'ALMOST_FINISHED':
      return 'Почти завершен';
    case 'SUCCESSFUL':
      return 'Успешный';
    case 'FAILED':
      return 'Провал';
    default:
      return status;
  }
}
