<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;
    public $token;
    public $email;
    /**
     * Create a new message instance.
     */
    public function __construct($token, $email)
    {
        $this->token = $token;
        $this->email = $email;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reset Password Mail',
        );
    }

    public function build()
    {
        $logoPath = public_path('images/logo.png'); // Giả sử logo nằm trong thư mục public/images
        return $this->view('emails.reset_password')
                    ->with([
                        'token' => $this->token,
                        'email' => $this->email,
                        'url' => url('password/reset/confirm/'.$this->token), // Đường dẫn xác thực
                    ])
                    ->attach($logoPath, [
                        'as' => 'logo.png',  // Tên tệp đính kèm
                        'mime' => 'image/png',  // Loại mime
                        'cid' => 'logo.png',
                    ]);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
