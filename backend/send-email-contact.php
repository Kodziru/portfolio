<?php
// Destinataire et sujet
$destinataire = "contact@emiservice.fr";
$sujet = "Nouveau message de service";

// Initialiser une réponse JSON
header('Content-Type: application/json');

// Vérifier la méthode de requête
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Récupérer et sécuriser les données envoyées
    $fullName = htmlspecialchars(strip_tags($_POST['fullName'] ?? ""));
    $email = filter_var($_POST['email'] ?? "", FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(strip_tags($_POST['subject'] ?? ""));
    $message = htmlspecialchars(strip_tags($_POST['message'] ?? ""));
    $contactPreference = htmlspecialchars(strip_tags($_POST['contactPreference'] ?? ""));

    // Vérifier que les champs requis sont remplis
    if (empty($fullName) || empty($email) || empty($subject) || empty($message)) {
        echo json_encode(["message" => "Tous les champs requis ne sont pas remplis."]);
        exit;
    }

    // Construire le contenu de l'e-mail
    $contenu_email = "Nom complet : $fullName\n";
    $contenu_email .= "Email : $email\n";
    $contenu_email .= "Sujet : $subject\n";
    $contenu_email .= "Message : $message\n";
    $contenu_email .= "Préférence de contact : $contactPreference\n";

    // Définir les en-têtes de l'e-mail
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Envoyer l'e-mail
    if (mail($destinataire, $sujet, $contenu_email, $headers)) {
        echo json_encode(["message" => "E-mail envoyé avec succès."]);
    } else {
        echo json_encode(["message" => "Erreur lors de l'envoi de l'e-mail."]);
    }
} else {
    // Méthode de requête non autorisée
    echo json_encode(["message" => "Méthode non autorisée."]);
}
?>
