<?php

namespace App;

enum Taxonomy: string
{
    use EnumArrayable;

    case Aus = 'aus';
}
