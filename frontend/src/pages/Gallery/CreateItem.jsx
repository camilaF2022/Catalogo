import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  FormLabel,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import useSnackBars from "../../hooks/useSnackbars";
import UploadButton from "./components/UploadButton";
import AutocompleteExtended from "./components/AutocompleteExtended";
import { API_URLS } from "../../api";

export const allowedFileTypes = {
  object: ["obj"],
  texture: ["jpg", "jpeg", "png"],
  material: ["mtl"],
  thumbnail: ["jpg", "jpeg", "png"],
  images: ["jpg", "jpeg", "png"],
};

const CreateItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addAlert } = useSnackBars();

  const [newObjectAttributes, setNewObjectAttributes] = useState({
    object: {},
    texture: {},
    material: {},
    thumbnail: {},
    images: [],
    description: "",
    shape: {
      id: "",
      value: "",
    },
    culture: {
      id: "",
      value: "",
    },
    tags: [],
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const returnTo = !!location.state?.from;

  // Retrieved data from the API
  const [shapeOptions, setShapeOptions] = useState([]);
  const [cultureOptions, setCultureOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    fetch(API_URLS.ALL_METADATA)
      .then((response) => response.json())
      .then((response) => {
        let metadata = response.data;

        let shapes = metadata.shapes;
        let cultures = metadata.cultures;
        let tags = metadata.tags;

        setShapeOptions(shapes);
        setCultureOptions(cultures);
        setTagOptions(tags);
      })
      .catch((error) => {
        setErrors(true);
        addAlert(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (name, value) => {
    setNewObjectAttributes({ ...newObjectAttributes, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(`model[object]`, newObjectAttributes.object);
    formData.append(`model[texture]`, newObjectAttributes.texture);
    formData.append(`model[material]`, newObjectAttributes.material);
    formData.append(`thumbnail`, newObjectAttributes.thumbnail);
    newObjectAttributes.images.forEach((image) =>
      formData.append("images", image)
    );
    formData.append("description", newObjectAttributes.description);
    formData.append("id_shape", newObjectAttributes.shape.id);
    formData.append("id_culture", newObjectAttributes.culture.id);
    newObjectAttributes.tags.forEach((tag) =>
      formData.append("id_tags", tag.id)
    );

    await fetch(`${API_URLS.DETAILED_ARTIFACT}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        const successfully_response = response.data;
        const newArtifactId = successfully_response.id;
        addAlert("¡Objeto creado con éxito!");
        navigate(`/catalog/${newArtifactId}`);
      })
      .catch((error) => {
        addAlert(error.message);
      });
  };

  const handleCancel = () => {
    const from = location.state?.from || "/catalog";
    navigate(from, { replace: true });
  };

  return (
    <Container>
      <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
        <Grid container rowGap={4}>
          <CustomTypography variant="h1">Agregar nuevo objeto</CustomTypography>
          <Grid container spacing={2}>
            <ColumnGrid item xs={6} rowGap={2}>
              <UploadButton
                label="Objeto *"
                name="object"
                isRequired
                setStateFn={setNewObjectAttributes}
              />
              <UploadButton
                label="Textura *"
                name="texture"
                isRequired
                setStateFn={setNewObjectAttributes}
              />
              <UploadButton
                label="Material *"
                name="material"
                isRequired
                setStateFn={setNewObjectAttributes}
              />
              <UploadButton
                label="Miniatura (opcional)"
                name="thumbnail"
                setStateFn={setNewObjectAttributes}
              />
              <UploadButton
                label="Imágenes (opcional)"
                name="images"
                isMultiple
                setStateFn={setNewObjectAttributes}
              />
            </ColumnGrid>
            <ColumnGrid item xs={6} rowGap={1}>
              <FormLabel component="legend">Descripción *</FormLabel>
              <TextField
                required
                id="description"
                name="description"
                placeholder="Descripción del objeto"
                multiline
                rows={4}
                fullWidth
                value={newObjectAttributes.description}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
              <FormLabel component="legend">Forma *</FormLabel>
              <AutocompleteExtended
                id="shape"
                name="shape"
                value={newObjectAttributes.shape}
                setValue={handleInputChange}
                options={shapeOptions}
                placeholder="Seleccionar la forma del objeto"
                isRequired
                fullWidth
                filterSelectedOptions
                disabled={loading || errors}
                allowCreation={false}
              />
              <FormLabel component="legend">Cultura *</FormLabel>
              <AutocompleteExtended
                id="culture"
                name="culture"
                value={newObjectAttributes.culture}
                setValue={handleInputChange}
                options={cultureOptions}
                placeholder="Seleccionar la cultura del objeto"
                isRequired
                fullWidth
                filterSelectedOptions
                disabled={loading || errors}
                allowCreation={false}
              />
              <FormLabel component="legend">Etiquetas (opcional)</FormLabel>
              <AutocompleteExtended
                multiple
                limitTags={3}
                fullWidth
                id="tags"
                name="tags"
                value={newObjectAttributes.tags}
                setValue={handleInputChange}
                options={tagOptions}
                placeholder="Seleccionar las etiquetas del objeto"
                filterSelectedOptions
                disabled={loading || errors}
                allowCreation={false}
              />
            </ColumnGrid>
          </Grid>
          <Grid container justifyContent="flex-end" columnGap={2}>
            <Button variant="text" color="secondary" onClick={handleCancel}>
              {returnTo ? "Cancelar" : "Volver al catálogo"}
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Publicar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

const CustomTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(12),
  textAlign: "left",
}));

const ColumnGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

export default CreateItem;
