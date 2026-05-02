namespace CarRental.Application.Exceptions
{
    public abstract class AppException : Exception
    {
        protected AppException(string message, int statusCode)
            : base(message)
        {
            StatusCode = statusCode;
        }

        public int StatusCode { get; }
    }

    public sealed class BadRequestException : AppException
    {
        public BadRequestException(string message)
            : base(message, 400)
        {
        }
    }

    public sealed class UnauthorizedException : AppException
    {
        public UnauthorizedException(string message)
            : base(message, 401)
        {
        }
    }

    public sealed class ConflictException : AppException
    {
        public ConflictException(string message)
            : base(message, 409)
        {
        }
    }

    public sealed class InternalServerException : AppException
    {
        public InternalServerException(string message)
            : base(message, 500)
        {
        }
    }
}