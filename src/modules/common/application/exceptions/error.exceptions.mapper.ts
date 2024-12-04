export class ErrorExceptionsMapper {
  static map(error: any) {
    return {
      message: error.message,
      statusCode: error.statusCode,
    };
  }
}
