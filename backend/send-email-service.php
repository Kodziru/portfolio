<?php
// Paramètres de l'e-mail
$destinataire = "contact@emiservice.fr"; // Remplacez par votre adresse e-mail sur Hostinger
$sujet = "Nouveau message de service";

// Initialiser la réponse JSON
header('Content-Type: application/json');

// Vérifier que la méthode de requête est POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Vérifier et sécuriser les données envoyées
    $nom = htmlspecialchars(strip_tags($_POST["name"] ?? ""));
    $email = filter_var($_POST["email"] ?? "", FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(strip_tags($_POST["phone"] ?? ""));
    $message = htmlspecialchars(strip_tags($_POST["message"] ?? ""));
    $serviceType = htmlspecialchars(strip_tags($_POST["serviceType"] ?? "Service"));
    $selectedOptions = json_decode($_POST["selectedOptions"] ?? "[]", true); // Decode JSON dans un tableau associatif
    $priceRange = htmlspecialchars(strip_tags($_POST["priceRange"] ?? ""));

    // Vérifier l'email et les champs requis
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Adresse e-mail invalide."]);
        exit;
    }
    if (empty($nom) || empty($message)) {
        echo json_encode(["status" => "error", "message" => "Tous les champs requis ne sont pas remplis."]);
        exit;
    }

    // Construire le contenu de l'e-mail
    $contenu_email = "Nouveau message pour le service : $serviceType\n\n";
    $contenu_email .= "Détails du client:\n";
    $contenu_email .= "Nom: $nom\n";
    $contenu_email .= "Email: $email\n";
    $contenu_email .= "Téléphone: $phone\n\n";
    $contenu_email .= "Message:\n$message\n\n";
    
    if (is_array($selectedOptions)) {
        $contenu_email .= "Options sélectionnées :\n";
        foreach ($selectedOptions as $option) {
            $option = htmlspecialchars(strip_tags($option));
            $contenu_email .= "- $option\n";
        }
    }
    
    $contenu_email .= "\nEstimation de prix : $priceRange\n";

    // Définir les en-têtes de l'e-mail
    $headers = "From: contact@emiservice.fr\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Envoyer l'e-mail
    if (mail($destinataire, $sujet, $contenu_email, $headers)) {
        echo json_encode(["status" => "success", "message" => "Votre message a été envoyé avec succès !"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Erreur lors de l'envoi de l'e-mail."]);
    }
} else {
    // Méthode de requête non autorisée
    echo json_encode(["status" => "error", "message" => "Méthode de requête non autorisée."]);
}
?>
